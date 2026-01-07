import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { RegistryItem } from '../../types';
import styles from './styles.module.css';


export default function ArticleListItem({ item }: { item: RegistryItem }) {
    const docPath = item.path.replace(/\.md$/, '');

    return (
        <Link to={docPath} className={styles.listLink}>
            <div className={styles.listItem}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <div className={styles.itemMeta}>
                    {item.tags && (
                        <div className={styles.tags}>
                            {item.tags.map(tag => (
                                <span key={tag} className={`tag-${tag.toLowerCase()} ${styles.tag}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {item.date && (
                        <span className={styles.date}>
                            {new Date(item.date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
