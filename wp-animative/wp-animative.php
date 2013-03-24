<?php
/*
Plugin Name: Animative
Plugin URI: http://ash.ms/
Description: Enables semantic animated slideshows in your pages.
Author: Ash Kyd
Version: 1.0
Author URI: http://ash.ms/
*/

$dir = plugin_dir_url(__FILE__);
wp_enqueue_script( 'animative', $dir.'animative.js', array('jquery'), '1.0', true );
wp_enqueue_style( 'animative', $dir.'animative.css' );
