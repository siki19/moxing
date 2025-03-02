// JavaScript Document
// DeepSeek API 配置
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'; // 替换为你的 DeepSeek API URL
const DEEPSEEK_API_KEY = 'sk-39cca09d796046ba95495e6fdea46981'; // 替换为你的 DeepSeek API Key

document.getElementById('submit').addEventListener('click', () => {
    const input = document.getElementById('input').value.trim();
    const chatMessages = document.getElementById('chat-messages');

    if (!input) return; // 如果输入为空，则不发送

    // 添加用户消息
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `
        <div class="message-bubble">${input}</div>
    `;
    chatMessages.appendChild(userMessage);

    // 清空输入框
    document.getElementById('input').value = '';

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 调用 DeepSeek API
    fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            prompt: input // 根据 DeepSeek API 的要求传递参数
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应失败');
        }
        return response.json();
    })
    .then(data => {
        // 添加机器人消息
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.innerHTML = `
            <div class="message-bubble">${data.response}</div> <!-- 根据 API 返回的数据结构调整 -->
        `;
        chatMessages.appendChild(botMessage);

        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })

});