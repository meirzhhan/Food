<?php
$_POST = json_decode(file_get_contents("php://input", true)); //Дэкодирование в JSON
echo var_dump($_POST);