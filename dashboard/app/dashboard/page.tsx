"use client";

import { useIsMutating } from '@tanstack/react-query';
import {
    InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useLocale } from '~/utils/use-locale';
import { trpc } from '~/utils/trpc';
import TaskView from '~/components/tasks/tasks-view';
import { isPast, isToday, isTomorrow } from 'date-fns'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function TodosPage(props: PageProps) {
    const { t } = useLocale();
    /*
     * This data will be hydrated from the `prefetch` in `getStaticProps`. This means that the page
     * will be rendered with the data from the server and there'll be no client loading state 👍
     */
    const allTasks = trpc.todo.all.useQuery(undefined, {
        staleTime: 3000,
    });

    const utils = trpc.useContext();
    const addTask = trpc.todo.add.useMutation({
        async onMutate({ text }) {
            /**
             * Optimistically update the data
             * with the newly added task
             */
            await utils.todo.all.cancel();
            const tasks = allTasks.data ?? [];
            utils.todo.all.setData(undefined, [
                ...tasks,
                {
                    id: `${Math.random()}`,
                    completed: false,
                    text,
                    createdAt: new Date(),
                },
            ]);
        },
    });

    const number = useIsMutating();
    useEffect(() => {
        // invalidate queries when mutations have settled
        // doing this here rather than in `onSettled()`
        // to avoid race conditions if you're clicking fast
        if (number === 0) {
            void utils.todo.all.invalidate();
        }
    }, [number, utils]);

    const taskItems = allTasks.data ? allTasks.data.reduce((acc, curr) => {
        if (isPast(curr.dueDate)) {
            acc['Overdue'].push(curr.text);
        }
        else if (isToday(curr.dueDate)) {
            acc['Today'].push(curr.text);
        }
        else if (isTomorrow(curr.dueDate)) {
            acc['Tomorrow'].push(curr.text);
        } else {
            acc['Upcoming'].push(curr.text);
        }

        return acc;
    }, {
        "Overdue": [],
        "Today": [],
        "Tomorrow": [],
        "Upcoming": []
    }) : [];

    return (
        <>
            <Head>
                <title>Tali</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="todoapp">
                <header className="header">
                    <h1>Tali</h1>
                </header>

                <section className="main">
                    <TaskView items={taskItems || []} />
                </section>
            </section>
        </>
    );
}