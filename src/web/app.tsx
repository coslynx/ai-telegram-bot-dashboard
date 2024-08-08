import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../db';
import { useSession } from 'next-auth/react';
import { prisma } from '../db';
import { useStore } from '../store';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function App({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    setTheme,
    setDrawerOpen,
    setChatHistory,
    setConversationId,
  } = useStore();

  useEffect(() => {
    if (session) {
      setTheme(session?.user?.theme || 'light');
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      db.connect();
    }

    return () => {
      if (session) {
        db.disconnect();
      }
    };
  }, [session]);

  useEffect(() => {
    if (session) {
      router.refresh();
    }
  }, [session, router]);

  useEffect(() => {
    if (session) {
      const getConversation = async () => {
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
            setChatHistory(conversation.chatHistory);
            setConversationId(conversation.id);
          }
        } catch (error) {
          toast.error('Error loading conversation: ' + error);
        }
      };

      getConversation();
    }
  }, [session, setChatHistory, setConversationId]);

  return (
    <>
      {children}
    </>
  );
}

export async function getServerSideProps() {
  const session = await getSession();

  return {
    props: {
      session: session,
    },
  };
}