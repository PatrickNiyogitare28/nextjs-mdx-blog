import Head from 'next/head';
import {format, parseISO} from 'date-fns';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import {getAllPosts} from '../../lib/data';

export default function BlogPage({title, data, content}){
    const hydratedContent = hydrate(content);

    return (
        <div className="w-6/12">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.icon" />
            </Head>

            <main>
                <div className="border-b-2 border-gray-200 mb-4">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <div className="text-gray-600 text-md">
                      1st Sept 2021
                    </div>
                </div>
                <div className="prose">
                    {hydratedContent}
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps(context){
    const {params} = context;
    const allPosts = getAllPosts();
    const {data, content} = allPosts.find((item) => item.slug === params.slug)
    const mdxSource = await renderToString(content);

    return {
        props: {
            ...data,
            date: data.date.toISOString(),
            content: mdxSource
        }
    }
}

export async function getStaticPaths(){
    return {
        paths: getAllPosts().map((post) => ({
            params: {
                slug: post.slug
            }
        })),
        fallback:false
    }
}
