'use client'

import { useState } from 'react'

// Category Filters 구현 아래 카테고리를 고를 수 있어야함
// - 구약신약
// - 성경책

export default function SearchDropDown() {
  const [testament, setTestament] = useState('old-testament');

  return (
    <>
        <div className="search-dropdown">
            <div className="category-filter">
                <h3>구약신약</h3>
                <div className="filter-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select 
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                        onChange={(e) => setTestament(e.target.value)}
                    >
                        <option value="old-testament">구약</option>
                        <option value="new-testament">신약</option>
                    </select>
                    <select style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        {testament === 'old-testament' ? (
                        <>
                            <option value="genesis">창세기</option>
                            <option value="exodus">출애굽기</option>
                            <option value="leviticus">레위기</option>
                            <option value="numbers">민수기</option>
                            <option value="deuteronomy">신명기</option>
                            {/* Add more Old Testament books as needed */}
                        </>
                        ) : (
                        <>
                            <option value="matthew">마태복음</option>
                            <option value="mark">마가복음</option>
                            <option value="luke">누가복음</option>
                            <option value="john">요한복음</option>
                            <option value="acts">사도행전</option>
                            {/* Add more New Testament books as needed */}
                        </>
                        )}
                    </select>
                    <button
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                        onClick={() => console.log('이동')}>
                            선택한 성경으로 이동
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}