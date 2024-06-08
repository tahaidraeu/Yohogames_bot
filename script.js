function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
    if (message === '') return;

    displayMessage(message, 'user-message');
    inputField.value = '';

    const botResponse = chatbotResponse(message);
    displayMessage(botResponse, 'bot-message');
}

function displayMessage(message, className) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add(className);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function chatbotResponse(userInput) {
    const validOptions = ["الطماطم", "الذرة", "الجزر", "الكتكوت", "الروبيان", "الفلفل", "السمك"];
    
    if (userInput.includes("أبدا")) {
        return "اهلا! أرسل لي في رسالة تالية الخيار التي ستختاره من عجلة الحظ في لعبة المزرعة توب توب";
    } else if (/^الخيار هو/.test(userInput)) {
        const options = userInput.slice(10).split(',').map(option => option.trim());

        for (const option of options) {
            if (!validOptions.includes(option)) {
                return `خطأ: الخيار "${option}" غير صالح. الخيارات الصالحة هي: ${validOptions.join(', ')}`;
            }
        }

        const optionsCount = 4;
        const randomResponses = generateRandomResponses(optionsCount);
        return formatOptionsWithProbabilities(randomResponses);
    } else if (userInput.includes("لم تنجح")) {
        return "أنا آسف، ربما لم نحلل قائمة النتيجة أرسل إلي الخيارات الخاصة بها";
    } else if (userInput.includes("أعطني توقع ربح")) {
        return "أرجوك أستعمل الأمر أبدا";
    } else if (userInput.includes("من أنت")) {
        return "أنا بوت توقع مدرب بالذكاء الاصطناعي ومخصص للزبون رقم 21 الذي يقوم مطوري باستلام مهمة تطويري لأجل طلبه";
    } else if (userInput.includes("التوقعات")) {
        return "رجاءا قم باستعمال الأمر ابدا في كل مرة تقوم باختيار توقع";
    } else if (userInput.includes("المزرعة توب توب")) {
        return "المرزعة توب توب أو القط الشره هي لعبة من ألعاب عجلات الحظ التي تقوم بتطويرها يوهو جيمز";
    } else {
        return "آسف، لم أفهم ما قلته. يمكنك محاولة صياغة سؤال مختلف.";
    }
}

function generateRandomResponses(count) {
    const options = [
        { option: "الطماطم", weight: 0 },
        { option: "الذرة", weight: 0 },
        { option: "الجزر", weight: 0 },
        { option: "الكتكوت", weight: 0 },
        { option: "الروبيان", weight: 0 },
        { option: "الفلفل", weight: 0 },
        { option: "السمك", weight: 0 }
    ];

    let remainingWeight = 100;
    const randomResponses = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * options.length);
        const weight = Math.floor(Math.random() * (remainingWeight - (options.length - i - 1))) + 1;
        randomResponses.push({ ...options[randomIndex], weight });
        remainingWeight -= weight;
        options.splice(randomIndex, 1);
    }

    return randomResponses;
}

function formatOptionsWithProbabilities(options) {
    let formattedResponse = "خيارات محتملة مع نسب عرض عشوائية:\n";
    options.forEach((option) => {
        formattedResponse += `${option.option}: ${option.weight.toFixed(2)}%\n`;
    });
    return formattedResponse;
}
