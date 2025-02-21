import EntryPointForVerseCard from "./components/EntryPointForVerseCard";
import EntryPointForMakeVerseCard from "./components/EntryPointForMakeVerseCard";
import { VerseFeed } from "./components/feed/VerseFeed";
import { HeratBibleMainSignTextLogo } from "./components/HeartBibleMainSignTextLogo";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center "> 
        <div>
          <HeratBibleMainSignTextLogo />
        </div>
        <div className="grid items-center justify-center gap-4">
          <EntryPointForVerseCard />
          <EntryPointForMakeVerseCard />
        <div/>
          <VerseFeed />
        </div>
      </div>
    </>
  )
}