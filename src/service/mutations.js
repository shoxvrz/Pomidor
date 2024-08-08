import { useMutation } from '@tanstack/react-query';
import { sendTgMessage } from './api';

export const useSendMessage = () => {
    const { mutate, isSuccess, isLoading } = useMutation({
        mutationKey: ['message'],
        mutationFn: (userEmail) => sendTgMessage(userEmail)
    });

    return { isSuccess, mutate, isLoading };
};
