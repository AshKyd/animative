#!/bin/bash
mkdir wp-animative
cp wp-animative.php animative.css animative.js wp-animative
zip -r wp-animative.zip wp-animative
rm wp-animative -rf
