document.addEventListener("DOMContentLoaded", function () {
  function parseEnv(text) {
    const env = {};
    const lines = text.split("\n");

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) continue;

      const equalSignIndex = trimmedLine.indexOf("=");
      if (equalSignIndex !== -1) {
        const key = trimmedLine.substring(0, equalSignIndex).trim();
        const value = trimmedLine.substring(equalSignIndex + 1).trim();

        env[key] = value.replace(/^["'](.*)["']$/, "$1");
      }
    }

    return env;
  }

  function loadEnvFile() {
    return fetch(".env")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не вдалося завантажити файл .env");
        }
        return response.text();
      })
      .then((text) => parseEnv(text))
      .catch((error) => {
        return {};
      });
  }

  function createWidget() {
    const widget = document.createElement("div");
    widget.id = "sweaty-ai-widget";
    widget.className = "minimized";
    widget.innerHTML = `
            <div class="sweaty-ai-button">
                <span>AI</span>
            </div>
            <div class="sweaty-ai-modal">
                <div class="sweaty-ai-header">
                    <div class="sweaty-ai-title">
                        <span>🤖</span>
                        <h3>Sweaty AI</h3>
                    </div>
                    <div class="sweaty-ai-controls">
                        <button class="close-btn">×</button>
                    </div>
                </div>
                <div class="sweaty-ai-body">
                    <div class="sweaty-ai-messages">
                    </div>
                    <div class="sweaty-ai-input">
                        <input type="text" placeholder="Enter your message..." style="text-indent: 15px; padding: 0 10px;" />
                        <button class="send-btn">➤</button>
                    </div>
                </div>
            </div>
        `;
    document.body.appendChild(widget);
    loadEnvFile().then((env) => {
      initWidget(env);
    });
  }

  loadEnvFile().then((env) => {
    const widgetElement = document.getElementById("sweaty-ai-widget");
    if (widgetElement) {
      initWidget(env);
    } else {
      createWidget();
    }
  });

  function initWidget(env) {
    const widgetElement = document.getElementById("sweaty-ai-widget");

    if (!widgetElement) {
      createWidget();
      return;
    }

    const sweaty = {
      widget: widgetElement,
      button: widgetElement.querySelector(".sweaty-ai-button"),
      modal: widgetElement.querySelector(".sweaty-ai-modal"),
      closeBtn: widgetElement.querySelector(".close-btn"),
      messagesContainer: widgetElement.querySelector(".sweaty-ai-messages"),
      inputField: widgetElement.querySelector(".sweaty-ai-input input"),
      sendBtn: widgetElement.querySelector(".send-btn"),
      isActive: false,
      isMinimized: true,
      autoOpenTimer: null,
      apiEndpoint: env.AI_ENDPOINT,
      apiKey: env.API_KEY,
      aiModel: env.AI_MODEL,
      messageHistory: [],

      init: function () {
        if (
          !this.button ||
          !this.modal ||
          !this.closeBtn ||
          !this.messagesContainer ||
          !this.inputField ||
          !this.sendBtn
        ) {
          return;
        }

        this.clearChatHistory();
        this.addMessage(
          "Hello! I'm Sweaty AI. How can I help you today?",
          "ai"
        );
        this.setupEventListeners();
        this.scheduledAppearance();
      },

      setupEventListeners: function () {
        this.button.addEventListener("click", () => this.toggleWidget());

        this.closeBtn.addEventListener("click", () => this.closeWidget());

        this.sendBtn.addEventListener("click", () => this.sendMessage());
        this.inputField.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            this.sendMessage();
          }
        });
      },

      toggleWidget: function () {
        this.isMinimized = !this.isMinimized;
        this.updateWidgetState();
      },

      closeWidget: function () {
        this.isMinimized = true;
        this.updateWidgetState();

        clearTimeout(this.autoOpenTimer);
      },

      updateWidgetState: function () {
        if (this.isMinimized) {
          this.widget.classList.add("minimized");
          this.widget.classList.remove("active");
        } else {
          this.widget.classList.remove("minimized");
          this.widget.classList.add("active");
        }
      },

      scheduledAppearance: function () {
        this.autoOpenTimer = setTimeout(() => {
          if (this.isMinimized) {
            this.isMinimized = false;
            this.updateWidgetState();
          }
        }, 5000);
      },

      sendMessage: function () {
        const userMessage = this.inputField.value.trim();

        if (!userMessage) return;

        this.addMessage(userMessage, "user");
        this.showTypingIndicator();
        this.getAIResponse(userMessage);

        this.inputField.value = "";
      },

      addMessage: function (text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;

        const contentDiv = document.createElement("div");
        contentDiv.className = "message-content";

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(contentDiv);

        this.messagesContainer.appendChild(messageDiv);

        this.messageHistory.push({ text, sender });
        this.saveChatHistory();

        this.scrollToBottom();
      },

      showTypingIndicator: function () {
        const typingDiv = document.createElement("div");
        typingDiv.className = "message ai typing-indicator";
        typingDiv.innerHTML = `
                    <div class="message-content typing">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
        return typingDiv;
      },

      removeTypingIndicator: function () {
        const typingIndicator =
          this.messagesContainer.querySelector(".typing-indicator");
        if (typingIndicator) {
          typingIndicator.remove();
        }
      },

      scrollToBottom: function () {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      },

      getAIResponse: function (userMessage) {
        setTimeout(() => {
          this.removeTypingIndicator();

          if (!this.apiKey) {
            this.addMessage(
              "API key is not configured. Please specify the API key in the .env file.",
              "ai"
            );
            return;
          }

          this.fetchFromAPI(userMessage)
            .then((response) => {
              if (response && response.content) {
                this.addMessage(response.content, "ai");
              } else {
                this.addMessage(
                  "Sorry, an error occurred while processing your request.",
                  "ai"
                );
              }
            })
            .catch((error) => {
              this.addMessage(
                "Connection error with AI service. Please try again later.",
                "ai"
              );
            });
        }, 1500);
      },

      saveChatHistory: function () {
        localStorage.setItem(
          "sweatyAiChatHistory",
          JSON.stringify(this.messageHistory)
        );
      },

      clearChatHistory: function () {
        localStorage.removeItem("sweatyAiChatHistory");
        this.messageHistory = [];
        this.messagesContainer.innerHTML = "";
      },

      fetchFromAPI: function (message) {
        const messages = [];

        const recentMessages = this.messageHistory.slice(-20);

        recentMessages.forEach((historyItem) => {
          messages.push({
            role: historyItem.sender === "user" ? "user" : "assistant",
            content: historyItem.text,
          });
        });

        messages.push({
          role: "user",
          content: message,
        });

        const requestData = {
          model: this.aiModel,
          messages: messages,
        };

        return fetch(this.apiEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network error: " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            if (data.choices && data.choices[0] && data.choices[0].message) {
              return {
                content: data.choices[0].message.content,
              };
            } else {
              throw new Error("Unexpected response format");
            }
          })
          .catch((error) => {
            return {
              content:
                "Connection error with AI service. Please try again later.",
            };
          });
      },
    };

    sweaty.init();
  }
});
