<?php

function isValidEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function isEmailInFile($email, $fileName)
{
    if (!file_exists($fileName)) {
        return false;
    }

    $lines = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        if ($line === $email) {
            return true;
        }
    }

    return false;
}

function appendEmailToFile($email, $fileName)
{
    $file = fopen($fileName, 'a');
    fwrite($file, $email . PHP_EOL);
    fclose($file);
}

function removeEmailFromFile($email, $fileName)
{
    if (!file_exists($fileName)) {
        return;
    }

    $lines = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $file = fopen($fileName, 'w');
    foreach ($lines as $line) {
        if ($line !== $email) {
            fwrite($file, $line . PHP_EOL);
        }
    }
    fclose($file);
}

$fileName = "";
require "secret.php";

if (isset($_GET['email']) && isset($_GET['type']) && $fileName != "") {
    $email = $_GET['email'];
    $type = $_GET['type'];

    if (isValidEmail($email)) {
        if ($type === "subscribe") {
            if (!isEmailInFile($email, $fileName)) {
                appendEmailToFile($email, $fileName);
                echo "success: Thanks for your subscription ! We will contact you as soon as a new release is published.";
            } else {
                echo "info: You already subscribed to our newsletter and we truly thank you for that. If you want to unsubscribe, you are able to do this by clicking on the link 'unsubscribe' at the bottom of our release email.";
            }
        } elseif ($type === "unsubscribe") {
            if (isEmailInFile($email, $fileName)) {
                removeEmailFromFile($email, $fileName);
                echo "success: You have successfully unsubscribed from our newsletter. We hope to see you again soon.";
            } else {
                echo "error: The email you entered is not found in our subscription list. Please double-check your email and try again.";
            }
        } else {
            echo "error: Invalid request type.";
        }
    } else {
        echo "error: Please double-check your email and try again.";
    }
} else {
    echo "error: Server error.";
}