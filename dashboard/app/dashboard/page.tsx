"use client";

import { useIsMutating } from '@tanstack/react-query';
import { inferProcedureOutput } from '@trpc/server';
import clsx from 'clsx';
import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import { i18n } from 'next-i18next.config';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from '~/utils/use-locale';
import { AppRouter } from '~/server/routers/_app';
import { ssgInit } from '~/server/ssg-init';
import { trpc } from '~/utils/trpc';
import { useClickOutside } from '~/utils/use-click-outside';
import TaskView from '~/components/TaskView';

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
                    {/* <label htmlFor="toggle-all">{t('mark_all_as_complete')}</label>
                    <ul className="todo-list">
                        {allTasks.data
                            ?.filter(({ completed }) =>
                                props.filter === 'completed'
                                    ? completed
                                    : props.filter === 'active'
                                        ? !completed
                                        : true,
                            )
                            .map((task) => (
                                <ListItem key={task.id} task={task} />
                            ))}
                    </ul> */}
                    <TaskView items={allTasks?.data || []} />
                </section>
            </section>
        </>
    );
}