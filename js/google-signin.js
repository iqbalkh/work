var helper = (function() {
	//alert('google-signin.js loaded');
	var authResult = undefined;
	var timesCalled = 0;
	
	return {
		/**
		* Hides the sign-in button and connects the server-side app after
		* the user successfully signs in.
		*
		* @param {Object} authResult An Object which contains the access token and
		*   other authentication information.
		*/
		onSignInCallback: function(authResult) {
			timesCalled++;
			//alert('calling onSignInCallback for the ' + timesCalled + ' time.');
			/*
			for (var field in authResult) {
				$('#authResult').append(' ' + field + ': ' + authResult[field] + '<br/>');
			}
			//*/
			if (authResult['access_token']) {
				access_token = authResult['access_token'];
				// The user is signed in
				this.authResult = authResult;
				helper.connectServer();
				// After we load the Google+ API, render the profile data from Google+.
				if (timesCalled >= 2) {
					gapi.client.load('plus','v1',this.renderProfile);
				}
			} else if (authResult['error']) {
				// There was an error, which means the user is not signed in.
				// As an example, you can troubleshoot by writing to the console:
				//console.log('There was an error: ' + authResult['error']);
				$('#authResult').append('Logged out');
				$('#authOps').hide();
				$('#gConnect').show();
			}
			//console.log('authResult', authResult);
		},
		/**
		* Retrieves and renders the authenticated user's Google+ profile.
		*/
		renderProfile: function() {
			//alert('calling renderProfile.');
			var request = gapi.client.plus.people.get({'userId' : 'me'});
			request.execute(function(profile) {
				var googleID = profile.id;
				var firstname = profile.name.givenName;
				var lastname = profile.name.familyName;
				var email = profile.emails[0].value;
				//alert(googleID + ' ' + firstname + ' ' + lastname + ' ' + email);
				$.ajax({
					url: 'prepareDataGoogleSSO.php',
					type: 'POST',
					data: '&googleID=' + googleID + '&firstname=' + firstname + '&lastname=' + lastname + '&email=' + email + '&googleAccessToken=' + access_token,
					dataType:'json',
					success: function(response) {
						/*
						console.log(response);
						return;
						//*/
						if (response != null) {
							var success = response.success;
							var googleID = response.googleID;
							var googleAccessToken = response.googleAccessToken;
							var firstname = response.firstname;
							var lastname = response.lastname;
							var email = response.email;
						}
						
						if (success === true) {
							/*
							var str = String(window.location);
							var res = str.split("/");
							if (res[3] == "") {
								window.location = '/valid';
							} else {
								$('#authOps').show();
								$('#gConnect').hide();
							}
							return;
							//*/
							$('#googleID').val(googleID);
							$('#googleAccessToken').val(googleAccessToken);
							$('#firstName').val(firstname);
							$('#lastName').val(lastname);
							$('#email').val(email);
							if ($("#signupsignin").length == 1) {
								$("#signupsignin").submit();
							} else
							if ($("#myform").length == 1) {
								$("#myform").submit();
							}
							//$('#signupsignin').submit();
						}
					}
				});
			});
		},
		/**
		* Calls the server endpoint to disconnect the app for the user.
		*/
		disconnectServer: function() {
			var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;
			// Perform an asynchronous GET request.
			$.ajax({
				type: 'GET',
				url: revokeUrl,
				async: false,
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(nullResponse) {
					// Do something now that user is disconnected
					// The response is always undefined.
					/*
					$('#authOps').hide();
					$('#profile').empty();
					$('#visiblePeople').empty();
					$('#authResult').empty();
					$('#gConnect').show();
					//*/
					window.location = '/';
				},
				error: function(e) {
					// Handle the error
					// console.log(e);
					// You could point users to manually disconnect if unsuccessful
					// https://plus.google.com/apps
				}
			});
		},
		/**
		* Calls the server endpoint to connect the app for the user. The client
		* sends the one-time authorization code to the server and the server
		* exchanges the code for its own tokens to use for offline API access.
		* For more information, see:
		*   https://developers.google.com/+/web/signin/server-side-flow
		*/
		connectServer: function() {
			//console.log(this.authResult.code);
			$.ajax({
				type: 'POST',
				url: window.location.href,
				contentType: 'application/octet-stream; charset=utf-8',
				success: function(result) {
					//console.log(result);
				},
				processData: false,
				data: this.authResult.code
			});
		},
	};
})();

/**
* Perform jQuery initialization
*/
$(document).ready(function() {
	$('#disconnect').off('click');
	$('#disconnect').click(helper.disconnectServer);
});

/**
* Calls the helper method that handles the authentication flow.
*
* @param {Object} authResult An Object which contains the access token and
*   other authentication information.
*/
function onSignInCallback(authResult) {
	helper.onSignInCallback(authResult);
}
