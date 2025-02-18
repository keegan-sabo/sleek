"use strict";
import { userData, translations } from "../render.js";
import { _paq } from "./matomo.mjs";
import { handleError } from "./helper.mjs";

const messageLoggingBody = document.getElementById("messageLoggingBody");
const messageLoggingButton = document.getElementById("messageLoggingButton");
const messageLoggingTitle = document.getElementById("messageLoggingTitle");
const messageShareBody = document.getElementById("messageShareBody");
const messageShareTitle = document.getElementById("messageShareTitle");
const messageGenericContainer = document.getElementById("messageGenericContainer");
const messageGenericMessage = document.getElementById("messageGenericMessage");
//const messageGenericContainerClose = document.getElementById("messageGenericContainerClose");

messageLoggingBody.innerHTML = translations.messageLoggingBody;
messageLoggingButton.innerHTML = translations.settings;
messageLoggingTitle.innerHTML = translations.errorEventLogging;
messageShareBody.innerHTML = translations.messageShareBody;
messageShareTitle.innerHTML = translations.messageShareTitle;

export function checkDismissedMessages() {
  try {
    const messages = document.querySelectorAll("#messages .message");
    const dismissedMessages = userData.dismissedMessages;
    if(!dismissedMessages) return Promise.resolve("Info: No already checked messages found, will skip this check");
    messages.forEach((message) => {
      if(dismissedMessages.includes(message.getAttribute("data"))) {
        message.classList.remove("is-active");
      } else {
        message.classList.add("is-active");
      }
    });
    return Promise.resolve("Info: Checked for already dismissed messages");
  } catch(error) {
    error.functionName = checkDismissedMessages.name;
    return Promise.reject(error);
  }
}
export function showGenericMessage(text) {
  try {
    if(text) {
      messageGenericContainer.classList.add("is-active");
      messageGenericMessage.innerHTML = text;
      // trigger matomo event
      if(userData.matomoEvents) _paq.push(["trackEvent", "Message", text])
    }
  } catch(error) {
    error.functionName = handleError.name;
    return Promise.reject(error);
  }
}