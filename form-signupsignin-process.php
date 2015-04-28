 



<div id="form" class="contact-us-form">
    <div class="subtitle">
        <strong>Fill the data here</strong>
    </div>
    <form id="callus" target="_self" onsubmit="" action="postContactToGoogle()">
        <fieldset>
            <label for="name">What's your name? *</label>
            <input id="name" type="text" name="name">
        </fieldset>
        <fieldset>
            <label for="email">What's your email? *</label>
            <input id="email" type="text" name="email">
        </fieldset>
        <fieldset>
            <label for="feed">Questions or Feedback?*</label>
            <textarea id="feed" name="feed"></textarea>
        </fieldset>
        <div style="text-align: right; padding-bottom: 15px;">* Required</div>
        <div style="width: 100%; display: block; float: right;">
            <button id="send" type="submit">
                Contact Us
            </button>
        </div>
        <div style="width: 100%; display: block; float: right; padding-top: 15px;">
            <div class="requestSubmited" style="display:none; text-align: center;">Your request has been sent!</div>
        </div>
    </form>
</div>



<script type="text/javascript">
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }"
    function postContactToGoogle(){
        var name = $j('#name').val();
        var email = $j('#email').val();
        var feed = $j('#feed').val();
        if ((name !== "") && (email !== "") && ((feed !== "") && (validateEmail(email)))) {
            $j.ajax({
	// here is the path problem
	//url: "https://docs.google.com/forms/d/113H_71nd98TWE0bByjHYNpnC-oVA6OBDWtppU30rBrU/formResponse",
                url: "https://docs.google.com/yourFormURL/formResponse",
                data: {"entry.1" : name, "entry.3" : email, "entry.4": feed},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function (){
 
                        $j('#name').val("");
                        $j('#email').val("");
                        $j('#feed').val("");
                        //Success message
                    },
                    200: function (){
                        $j('#name').val("");
                        $j('#email').val("");
                        $j('#feed').val("");
                        //Success Message
                    }
                }
            });
        }
        else {
            //Error message
        }
    }
</script>