import React from 'react';
import { RegistryItem } from '../types';
import styles from '../pages/index.module.css';
import authorsData from '@site/src/data/authors.yaml';
import tagsData from '@site/src/data/tags.yaml';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

interface Props {
    item: RegistryItem;
}

export default function PinnedArticleCard({ item }: Props) {
    const date = new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Get author images
    const authorImages = (item.authors || []).map(authorId => {
        const author = authorsData[authorId];
        return author ? author.image_url : null;
    }).filter(Boolean);

    const docPath = item.path.replace(/\.md$/, '');

    return (
        <Link to={docPath} className={styles.pinnedCard}>
            <div className={styles.pinnedCardHeader}>
                <span className={styles.pinnedDate}>{date}</span>
                <div className={styles.pinnedAuthors}>
                    {authorImages.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt="Author"
                            className={styles.pinnedAuthorImg}
                            style={{ zIndex: authorImages.length - idx }}
                        />
                    ))}
                </div>
            </div>


            <div className={styles.pinnedTags}>
                {(item.tags || []).map(tagId => {
                    const tag = tagsData[tagId];
                    const label = tag ? tag.label : tagId;

                    return (
                        <span
                            key={tagId}
                            className={`${styles.pinnedTag} tag-${tagId.toLowerCase()}`}
                        >
                            {label.toUpperCase()}
                        </span>
                    );
                })}
            </div>

            <h3 className={styles.pinnedTitle}>{item.title}</h3>
        </Link>
    );
}
