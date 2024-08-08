import { GetStaticProps } from 'next';
import { Session } from 'next-auth/react';
import { useStore } from '../store';
import { prisma } from '../db';
import { toast } from 'react-toastify';

export default function ConversationsPage() {
  const { setChatHistory, setConversationId } = useStore();

  return (
    <div>
      {/ Conversations page content goes here /}
      <h1>Conversations</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
  locale,
  locales,
  defaultLocale,
  params,
  query,
  resolvedUrl,
  ...props
}) => {
  const session = await getSession();

  if (session) {
    try {
      const conversation = await prisma.conversation.findUnique({
        where: {
          chatId_userId: {
            chatId: session?.user?.chatId,
            userId: session?.user?.id,
          },
        },
      });

      if (conversation) {
        return {
          props: {
            conversation: conversation,
          },
        };
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      toast.error('Error loading conversation: ' + error);
    }
  }

  return {
    props: {},
  };
};