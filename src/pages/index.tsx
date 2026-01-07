import React, { useMemo, useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import registry from '../registry.json';
import tagsData from '@site/src/data/tags.yaml';
import clsx from 'clsx';
import styles from './index.module.css';
import { RegistryItem } from '../types';
import ArticleListItem from '../components/ArticleListItem';
import PinnedArticleCard from '../components/PinnedArticleCard';

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    (registry as RegistryItem[]).forEach(item => {
      item.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredItems = useMemo(() => {
    return (registry as RegistryItem[]).filter(item => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = item.title.toLowerCase().includes(lowerSearch) ||
        item.tags?.some(tag => tag.toLowerCase().includes(lowerSearch));

      const matchesTags = selectedTags.length === 0 ||
        (item.tags && selectedTags.some(tag => item.tags?.includes(tag)));

      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <header className={clsx('hero', styles.heroBanner)}> {/* Removed hero--primary for cleaner look */}
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          {/* <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
        </div>
      </header>
      <main className={styles.container}>

        <div className={styles.topicSection}>
          <h2 className={styles.sectionTitle}>Products</h2>
          <div className={styles.topicGrid}>
            {Object.entries(tagsData).map(([key, data]: [string, any]) => {
              const classNameKey = `topicCard${key.charAt(0).toUpperCase() + key.slice(1)}`;
              return (
                <a
                  key={key}
                  href={`tags/${key}`}
                  className={clsx(styles.topicCard, styles[classNameKey])}
                >
                  <span className={styles.topicName}>{data.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.topicSection}>
          <h2 className={styles.sectionTitle}>Popular cookbooks</h2>
          <div className={styles.topicGrid}>
            {registry
              .filter((item: RegistryItem) => item.pinned)
              .slice(0, 3)
              .map((item: RegistryItem) => (
                <PinnedArticleCard key={item.path} item={item} />
              ))}
          </div>
        </div>



        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>
            All <span className={styles.count}>{filteredItems.length}</span>
          </h2>
          <div className={styles.filterContainer} ref={filterRef}>
            <button
              className={clsx(styles.filterButton, { [styles.active]: isFilterOpen || selectedTags.length > 0 })}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filter
              {selectedTags.length > 0 && (
                <span className={styles.activeFilterCount}>{selectedTags.length}</span>
              )}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8.825L10.6 4.225L12 5.625L6 11.625L0 5.625L1.4 4.225L6 8.825Z" fill="currentColor" />
              </svg>
            </button>

            {isFilterOpen && (
              <div className={styles.filterDropdown}>
                {availableTags.map(tag => (
                  <div
                    key={tag}
                    className={clsx(styles.filterOption, { [styles.selected]: selectedTags.includes(tag) })}
                    onClick={() => toggleTag(tag)}
                  >
                    <div className={styles.filterCheckbox} />
                    <span className={styles.filterLabel}>{tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.listGroup}>
          {filteredItems.map((item) => (
            <ArticleListItem key={item.path} item={item} />
          ))}
          {filteredItems.length === 0 && (
            <div className="text--center margin-vert--lg">
              <p>No recipes found.</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
