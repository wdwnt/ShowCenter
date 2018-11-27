<html>
<head>
    <title>WDWNT - The Map Game</title>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <script type="text/javascript" src="jquery-2.1.4.min.js"></script>
</head>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!--     <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"> -->
    <style>
    html,
    body {
        background-color: #f9f9f9;
        -webkit-font-smoothing: antialiased;
        padding: 0;
        margin: 0;
        background-color: #323b41;
        width: 100%;
    }
    
    * {
        font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
    }
    
    .container {
        text-align: center;
        background-color: #323b41;
    }
    
    .instructions {
        font-size: 14px;
        color: #666;
        display: inline-block;
        padding: 20px;
        background-color: #323b41;
        margin-top: 20px;
        color: white;
        line-height: 1.5;
    }
    
    .instructions strong {
        display: block;
        font-size: 20px;
        margin-bottom: 10px;
        color: #8f9fa9;
        font-weight: normal;
    }
    
    .note {
        margin-top: 20px;
        color: #f04444;
        padding: 20px;
        border: 1px solid #f5cfcf;
        display: inline-block;
        border-radius: 10px;
        font-size: 16px;
        background: #f9ecec;
    }
    
    .image-grid {
        min-height: 300px;
        border-collapse: separate;
        border-spacing: 0px;
        border-color: transparent;
        border: none;
        background-color: #f5f5f5;
        background-image: url(img_bgd.png);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: auto 70%;
        -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, .5);
        margin: 0 auto;
    }
    
    .clearfix {
        clear: both;
    }
    
    .row_num {
	    padding-left: 5px;
		padding-right: 5px;
    }
    
    .image-grid .image-block {
        background: transparent;
        border: none;
        border: none;
        position: relative;
        position: relative;
        width: 12.5%%;
        height: 12.5%%;
        background-size: 100% 100%;
    }
    
    .image-block img {
        display: block;
        border: 1px solid black;
    }
    </style>
</head>

<body>
    <div class="container">
        <table class="image-grid" cellpadding="0" cellspacing="0" border="0">
	    <?php
	        $width = "112px";
	        $height = "90px";
	        $image_base = "dhs/dhs";
	        $tile_url = "wdwnt.png";
// 			$tile_url = "hardhat.jpg";
	    	echo "<tr><td></td>";
	        
	        foreach (range('A', 'H') as $column){
		    	echo "<td width=\"$width\" align=\"center\">$column </td>";
		    }   
	        
	        echo "</tr>";
	        for ($a=0; $a<8; $a++) {
		        $row_num = $a + 1;
		        echo "<tr>";
		        $table_row = "<td height=\"$height\" class=\"row_num\">$row_num</td>";
		        echo $table_row;
			        
		        for ($b=0; $b<8; $b++){
			        $html = <<<HTML
			    <td class="image-block" ><img src="$tile_url" width="$width" height="$height" class="map-tile"/>
                    <img src="$image_base-$a-$b.jpeg" width="$width" height="$height" style="display:none" class="map-piece"/>
                </td>
HTML;
					echo $html;
		        }
		        
		        echo "</tr>";
	        }
	    ?>
        </table>
        <div class="note" id="androidWarning" style="display:none">Note: Make sure you are using <strong>Guidebook</strong>!</div>
        <p class="instructions">
            <strong>The Map Game...no, not The Math Game</strong> 
        </p>
        <p class="instructions">
	        <button type="button" id="reveal-all">Reveal All</button>
	        <button type="button" id="hide-all">Hide All</button>
        </p>
    </div>
    <!-- end container-->
    <script>
    //Show or hide the warning
    if (location.pathname.search("com.guidebook.apps.") !== -1 && navigator.userAgent.search("Android 2.") !== -1) {
        document.getElementById("androidWarning").style.display = "block";
    }
    var images = ",,,,,,,,,,,,,,,,";
    var qs = getQueryString();
    var startIndex = parseInt(qs['i']);
    var imageFileName;
    if (qs['f']) {
        imageFileName = qs['f'].split("/").pop();
    }
    var reset = qs['reset'];
    var storedImages = window.localStorage["guide_60476_phrase"];
    var cookieImages = readCookie("guide_60476_phrase");

    if (storedImages === undefined && cookieImages !== null)
        storedImages = cookieImages;
    if (cookieImages === null && storedImages !== undefined)
        cookieImages = storedImages;

    if (isNaN(startIndex) || !imageFileName) {
        startIndex = -1;
        imageFileName = '';
    }

    if (!storedImages || reset === 'true') {
        images = fillInImages(images, startIndex, imageFileName);
    } else {
        images = fillInImages(storedImages, startIndex, imageFileName);
    }

    window.localStorage["guide_60476_phrase"] = images;
    createCookie("guide_60476_phrase", images, 365);

    function fillInImages(storedImages, newImageIndex, newImageFileName) {
        var imageBlocks = document.getElementsByClassName("image-block");
        var newStoredImages = storedImages.split(",");
        if (newImageIndex >= 0 && newImageIndex < imageBlocks.length) {
            newStoredImages[newImageIndex] = newImageFileName;
        }

        for (var i = 0; i < imageBlocks.length; i++) {
            if (newStoredImages[i]) {
                imageBlocks[i].style.backgroundImage = "url('" + newStoredImages[i] + "')";
            }
        }
        return newStoredImages.join(",");
    }

    function getQueryString() {
        var result = {},
            queryString = location.search.substring(1),
            re = /([^&=]+)=([^&]*)/g,
            m;

        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return result;
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
$(".image-block").click(function() {
    $(this).find('img').toggle();
});

$("#reveal-all").click( function() {
    $('.map-tile').hide();
    $('.map-piece').show();
});

$("#hide-all").click( function() {
    $('.map-piece').hide();
    $('.map-tile').show();
});


    </script>
</body>

</html>

</html>