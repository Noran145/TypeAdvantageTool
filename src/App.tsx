import { useState } from 'react'
import './App.css'

const types = [
  'ノーマル', 'ほのお', 'みず', 'でんき', 'くさ', 'こおり',
  'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし',
  'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー'
]

const typeChart: Record<string, Record<string, number>> = {
  'ノーマル': { 'いわ': 0.5, 'ゴースト': 0, 'はがね': 0.5 },
  'ほのお': { 'ほのお': 0.5, 'みず': 0.5, 'くさ': 2, 'こおり': 2, 'むし': 2, 'いわ': 0.5, 'ドラゴン': 0.5, 'はがね': 2 },
  'みず': { 'ほのお': 2, 'みず': 0.5, 'くさ': 0.5, 'じめん': 2, 'いわ': 2, 'ドラゴン': 0.5 },
  'でんき': { 'みず': 2, 'でんき': 0.5, 'くさ': 0.5, 'じめん': 0, 'ひこう': 2, 'ドラゴン': 0.5 },
  'くさ': { 'ほのお': 0.5, 'みず': 2, 'くさ': 0.5, 'どく': 0.5, 'じめん': 2, 'ひこう': 0.5, 'むし': 0.5, 'いわ': 2, 'ドラゴン': 0.5, 'はがね': 0.5 },
  'こおり': { 'ほのお': 0.5, 'みず': 0.5, 'くさ': 2, 'こおり': 0.5, 'じめん': 2, 'ひこう': 2, 'ドラゴン': 2, 'はがね': 0.5 },
  'かくとう': { 'ノーマル': 2, 'こおり': 2, 'どく': 0.5, 'ひこう': 0.5, 'エスパー': 0.5, 'むし': 0.5, 'いわ': 2, 'ゴースト': 0, 'あく': 2, 'はがね': 2, 'フェアリー': 0.5 },
  'どく': { 'くさ': 2, 'どく': 0.5, 'じめん': 0.5, 'いわ': 0.5, 'ゴースト': 0.5, 'はがね': 0, 'フェアリー': 2 },
  'じめん': { 'ほのお': 2, 'でんき': 2, 'くさ': 0.5, 'どく': 2, 'ひこう': 0, 'むし': 0.5, 'いわ': 2, 'はがね': 2 },
  'ひこう': { 'でんき': 0.5, 'くさ': 2, 'こおり': 0.5, 'かくとう': 2, 'いわ': 0.5, 'はがね': 0.5 },
  'エスパー': { 'かくとう': 2, 'どく': 2, 'エスパー': 0.5, 'あく': 0, 'はがね': 0.5 },
  'むし': { 'ほのお': 0.5, 'くさ': 2, 'かくとう': 0.5, 'どく': 0.5, 'ひこう': 0.5, 'エスパー': 2, 'ゴースト': 0.5, 'あく': 2, 'はがね': 0.5, 'フェアリー': 0.5 },
  'いわ': { 'ほのお': 2, 'こおり': 2, 'かくとう': 0.5, 'じめん': 0.5, 'ひこう': 2, 'むし': 2, 'はがね': 0.5 },
  'ゴースト': { 'ノーマル': 0, 'エスパー': 2, 'ゴースト': 2, 'あく': 0.5 },
  'ドラゴン': { 'ドラゴン': 2, 'はがね': 0.5, 'フェアリー': 0 },
  'あく': { 'かくとう': 0.5, 'エスパー': 2, 'ゴースト': 2, 'あく': 0.5, 'フェアリー': 0.5 },
  'はがね': { 'ほのお': 0.5, 'みず': 0.5, 'でんき': 0.5, 'こおり': 2, 'いわ': 2, 'はがね': 0.5, 'フェアリー': 2 },
  'フェアリー': { 'ほのお': 0.5, 'かくとう': 2, 'どく': 0.5, 'ドラゴン': 2, 'あく': 2, 'はがね': 0.5 }
}

const typeColors: Record<string, string> = {
  'ノーマル': '#c0c0c0',
  'ほのお': '#ff0000',
  'みず': '#0000ff',
  'でんき': '#ffff00',
  'くさ': '#00ff00',
  'こおり': '#00ffff',
  'かくとう': '#800000',
  'どく': '#800080',
  'じめん': '#808000',
  'ひこう': '#808080',
  'エスパー': '#ff00ff',
  'むし': '#008000',
  'いわ': '#808080',
  'ゴースト': '#000000',
  'ドラゴン': '#000080',
  'あく': '#008080',
  'はがね': '#808080',
  'フェアリー': '#ffffff'
}

function App() {
  const [attackType, setAttackType] = useState('')
  const [defenseType1, setDefenseType1] = useState('')
  const [defenseType2, setDefenseType2] = useState('')

  const getEffectiveness = (attack: string, defense: string): number => {
    return typeChart[attack]?.[defense] ?? 1
  }

  const calculateResult = (): string => {
    if (!attackType || (!defenseType1 && !defenseType2)) return ''
    
    const eff1 = defenseType1 ? getEffectiveness(attackType, defenseType1) : 1
    const eff2 = defenseType2 ? getEffectiveness(attackType, defenseType2) : 1
    const total = eff1 * eff2

    if (total === 0) return '効果がない'
    if (total === 4) return '効果は抜群（4倍）'
    if (total === 2) return '効果は抜群（2倍）'
    if (total === 1) return '-'
    if (total === 0.5) return '効果はいまひとつ（半減）'
    if (total === 0.25) return '効果はいまひとつ（1/4倍）'
    return '-'
  }

  const getSelectStyle = (type: string) => ({
    backgroundColor: type ? typeColors[type] : '',
    color: '#fff'
  })

  return (
    <div className="container">
      <h1>タイプ相性チェッカー</h1>
      
      <div className="section">
        <label>攻撃タイプ:</label>
        <select 
          value={attackType} 
          onChange={(e) => setAttackType(e.target.value)}
          style={getSelectStyle(attackType)}
        >
          <option value="">選択してください</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="section">
        <label>防御タイプ:</label>
        <div className="defense-types">
          <select 
            value={defenseType1} 
            onChange={(e) => setDefenseType1(e.target.value)}
            style={getSelectStyle(defenseType1)}
          >
            <option value="">選択してください</option>
            {types.map(type => (
              <option key={type} value={type} disabled={type === defenseType2}>{type}</option>
            ))}
          </select>
          <select 
            value={defenseType2} 
            onChange={(e) => setDefenseType2(e.target.value)}
            style={getSelectStyle(defenseType2)}
          >
            <option value="">選択してください（任意）</option>
            {types.map(type => (
              <option key={type} value={type} disabled={type === defenseType1}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {calculateResult() && (
        <div className="result">
          {calculateResult()}
        </div>
      )}
    </div>
  )
}

export default App
