
import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import PinnedArticleCard from '@site/src/components/PinnedArticleCard';
import styles from '@site/src/pages/index.module.css';
import { RegistryItem } from '@site/src/types';
import registry from '@site/src/registry.json';

interface DocItem {
    id: string;
    title: string;
    permalink: string;
    description?: string;
}

interface Props {
    tag: {
        label: string;
        permalink: string;
        description?: string;
        count: number;
        items: DocItem[];
        allTagsPath: string;
        unlisted: boolean;
    };
}

export default function DocTagDocListPage({ tag }: Props): React.JSX.Element {
    const { items } = tag;

    // Transform items to RegistryItem format to reuse PinnedArticleCard
    const registryItems: RegistryItem[] = items.map(doc => {
        // Try to find the detailed metadata in registry.json 
        // We match by title or by path (checking if doc.permalink ends with registry path without extension)
        const registryEntry = (registry as RegistryItem[]).find(r => {
            if (r.title === doc.title) return true;
            const cleanPath = r.path.replace(/\.md$/, '');
            if (doc.permalink.endsWith(cleanPath)) return true;
            return false;
        });

        if (registryEntry) {
            return {
                ...registryEntry,
                // Ensure path is the permalink for correct linking
                path: doc.permalink
            };
        }

        // Fallback if not in registry
        return {
            title: doc.title,
            path: doc.permalink,
            date: new Date().toISOString(), // No date available in basic doc item
            authors: [],
            tags: [tag.label], // At least we know it has the current tag
            pinned: false,
        };
    });

    return (
        <>
            <Head>
                <title>{`Articles tagged "${tag.label}"`}</title>
                <meta name="description" content={`Articles tagged with "${tag.label}"`} />
            </Head>
            <main className={styles.container}>
                <div className="margin-vert--xl">
                    <div className={styles.listHeader}>
                        <h1 className={styles.sectionTitle}>
                            {tag.label} <span className={styles.count}>{items.length}</span>
                        </h1>
                        <Link to="/" className="button button--secondary button--sm">
                            View All Tags
                        </Link>
                    </div>

                    {tag.description && <p className="margin-bottom--lg">{tag.description}</p>}

                    <div className={styles.topicGrid}>
                        {registryItems.map((item) => (
                            <PinnedArticleCard key={item.path} item={item} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
