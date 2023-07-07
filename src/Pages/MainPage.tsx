import Header from "../components/common/Header";
import Main from "../components/Main";

import TransactionList from "../components/search/TransactionList";

interface IMainPageProps {
  isLight: boolean;
  onToggleDark: () => void;
}

function MainPage({ isLight, onToggleDark }: IMainPageProps) {
  return (
    <>
      <Header isLight={isLight} onToggleDark={onToggleDark} />
      <Main />
      <TransactionList userId="user123" />{" "}
      {/* TransactionList 컴포넌트를 추가 */}
    </>
  );
}

export default MainPage;
