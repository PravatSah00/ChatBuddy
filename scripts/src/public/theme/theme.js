/**
 * Define theme
 */
import { createTheme } from '@mui/material/styles';

// Get MUI's default theme for fallback values
// const defaultTheme = createTheme();

/**
 * Get MUI theme
 */
export const getTheme = (customColor = {}) => {

    return createTheme({
        /**
         * Color palet
         */
        palette: {
            background: {
                main:    customColor.backgroundMain ?? '#FFFFFF',
                header:  customColor.backgroundHeader ?? '#1976D2',
                avatar:  customColor.backgroundAvatar ?? '#FFFFFF',
                chatbot: customColor.backgroundAvatar ?? '#F0F0F0',
                botmessage:  customColor.backgroundBotmessage ?? '#F1F2F6',
                usermessage: customColor.backgroundUsermessage ?? '#1A72F2',
                input: customColor.backgroundInput ?? '#1E64C7',
                messageInput: customColor.backgroundMessageInput ?? '#FFFFFF',
            },
            text: {
                main:   customColor.textMain ?? '#2C3338',
                header: customColor.header ?? '#FFFFFF',
                usermessage: customColor.usermessage ?? '#E6EEF9',
                input: customColor.textInput ?? '#E6EEF9',
                messageInput: customColor.messageInput ?? '#A8A8A8',
            },
            button: {
                primary:   customColor.buttonPrimary ?? '#28405C',
                secondery: customColor.buttonSecondery ?? '#FFFFFF',
                submitInput: customColor.buttonSubmitInput ?? '#FFFFFF',
                submitMessage: customColor.buttonSumbmitMessage ?? '#A8A8A8',
            },
        },
    });
}
