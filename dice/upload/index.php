<!DOCTYPE html>
<html> 
<head>
    <link rel="icon" type="image/x-icon" href="/resources/images/nstrat.ico">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="./script.js"></script>
    <link rel="stylesheet" href="/resources/stylesheet/bulma.css">
</head>

<script type="text/javascript">
	$(document).ready(function() {
	    $('input[type="file"]').change(function(e) {
	        var fileName = e.target.files[0].name;
	        $("h4").text(fileName);
	    });
	});
</script>

<body style="background: #1F1B24;margin-top: 10px !important;">

  <div class="box file has-name is-boxed file is-primary" style="margin-left: auto; margin-right: auto; width: 15em;">
      <label class="file-label">
        
        <form method="post" enctype="multipart/form-data" action="upload.php">
          <input id="file-upload" name="myFile" class="file-input" type="file">
            
          <span class="file-cta">
              Choose a file...
          </span>

          <span class="file-name">
            <label for="file-upload" class="custom-file-upload">
              <i class="fa fa-cloud-upload"></i> <h4>Upload file</h4>
           </label>
          </span>

          <span>
            <br/><button name="fileUpload" type="submit" class="button is-info is-fullwidth">Upload</button>
          </span>
        </form>

      </label>
    </div>

</body>
</html>
