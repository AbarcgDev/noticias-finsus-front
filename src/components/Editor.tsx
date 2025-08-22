import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

export interface EditorProps {
    initialText?: string;
    onTextChange?: (text: string) => void;
}

const StyledTextarea = styled(TextareaAutosize)`
  min-height: 100%;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #000;
  padding: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  background-color: #ffffff;
  transition: border-color 0.2s ease;
  display: flex;
  justify-content: center

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Editor: React.FC<EditorProps> = ({
    initialText = '',
    onTextChange
}) => {
    const [text, setText] = useState(initialText);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setText(newValue);
        onTextChange?.(newValue); // Opcional: notificar al padre
    };

    return (
        <StyledTextarea
            value={text}
            onChange={handleChange}
            minRows={3}
            maxRows={10}
        />
    );
}