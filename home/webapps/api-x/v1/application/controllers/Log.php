<?php
if (!defined('BASEPATH')) {
  exit('No direct script access allowed');
}

class Log extends CI_Controller {
  public function index() {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    $base_url = str_replace('log', '', $_SERVER['REQUEST_SCHEME']   . '://' . $_SERVER['HTTP_HOST'] .  $_SERVER['REQUEST_URI']);
    $base_url = str_replace('index.php/', '', $base_url);

    $this->load->helper('file');
    $jstr = '<script src="' . $base_url . 'js/jquery/jquery-1.7.1.min.js" type="text/javascript" charset="utf-8"></script>';
    $jstr .= '<script src="' . $base_url . '/js/log.js" type="text/javascript" charset="utf-8"></script>';
    $css     = $base_url . "/css/log.css";

    $css_str = "<link rel='stylesheet' href=$css>";
    echo '<html><head><meta http-equiv="content-type" content="text/html;charset=utf-8">' . $jstr . $css_str . '<title>API日志</title></head>';
    echo "<body><div>";
    echo "<input onclick=clear_log() type=button value=Clear_log name=Hide_Input>";
    echo "</div>";

    $logfile = helper_getlogname();

    if (file_exists($logfile)) {
      $string = read_file(helper_getlogname());
    } else {
      $string = '';
    }

    $php_errmsg = '<h2>PHP error info:(/tmp/php_error.log)</h2>' . read_file('/tmp/php_error.log');
    echo "<pre>" . $php_errmsg . "</pre>";
    echo "<h2>Docker:logfile=$logfile </h2>";
    echo "<br/>";
    echo "<pre>" . $string . "</pre>";
    echo '
        <div id="menu">
                    <ul>
                        <li>
                        <a href="javascript:gotop();"><i class="fa fa-arrow-circle-up"></i></a>
                        </li>
                        <li>
                        <a href="javascript:gobottom();"><i class="fa fa-arrow-circle-down"></i></a>
                         </li>
                    </ul>
                </div>
               ';

    echo "</body></html>";
  }

  public function clearlog() {
    // echo "log file is " . helper_getlogname();
    file_put_contents(helper_getlogname(), '');
  }

  public function stock() {

    echo "111";
  }
}
