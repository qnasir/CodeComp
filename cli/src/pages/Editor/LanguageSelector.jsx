const languages = ['javascript', 'python', 'cpp', 'java'];

const LanguageSelector = ({ onLanguageChange }) => (
  <select onChange={(e) => onLanguageChange(e.target.value)}>
    {languages.map((lang) => (
      <option key={lang} value={lang}>
        {lang}
      </option>
    ))}
  </select>
);

export default LanguageSelector;