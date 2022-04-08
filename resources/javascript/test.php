<?php
$f = fopen("http://www.google.com/images/logo_sm.gif", "rb");
print_r(stream_get_meta_data($f));
fclose($f);
// ['Last-Modified']