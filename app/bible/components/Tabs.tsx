'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Book } from '@/app/types/models';


type TabsProps = {
  oldTestament: Book[];
  newTestament: Book[];
};

export default function Tabs({ oldTestament, newTestament }: TabsProps) {
  const [activeTab, setActiveTab] = useState<'old' | 'new'>('old');

  const TabButton = ({ id, isActive, onClick, children }: {
    id: 'old' | 'new';
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      className={`w-full inline-block p-4 border-b-2 rounded-t-lg ${
        isActive 
          ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
      }`}
      onClick={onClick}
      role="tab"
      aria-controls={id}
      aria-selected={isActive}
    >
      {children}
    </button>
  );

  const BibleSection = ({ books }: { books: Book[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book.book} className="border rounded-lg p-4 dark:border-gray-700">
          <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{book.name}</h3>
          <div className="flex flex-wrap gap-2">
            {[...Array(book.chapterCount)].map((_, i) => (
              <Link href={`/bible/nkrv/${book.book}/${i + 1}`} key={i}>
                <button 
                  className="w-7 h-7 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white rounded-full text-xs flex items-center justify-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                >
                  {i + 1}
                </button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li className="flex-1" role="presentation">
            <TabButton
              id="old"
              isActive={activeTab === 'old'}
              onClick={() => setActiveTab('old')}
            >
              구약성경
            </TabButton>
          </li>
          <li className="flex-1" role="presentation">
            <TabButton
              id="new"
              isActive={activeTab === 'new'}
              onClick={() => setActiveTab('new')}
            >
              신약성경
            </TabButton>
          </li>
        </ul>
      </div>

      <div role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
        {activeTab === 'old' ? (
          <BibleSection books={oldTestament} />
        ) : (
          <BibleSection books={newTestament} />
        )}
      </div>
    </>
  );
} 