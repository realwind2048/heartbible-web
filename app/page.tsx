import EntryPointForVerseCard from "./components/EntryPointForVerseCard";
import EntryPointForBible from "./components/EntryPointForBible";
import { VerseFeed } from "./components/feed/VerseFeed";

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center gap-4 px-5 md:px-10"> 
        <div className="grid grid grid-cols-1 md:grid-cols-2 justify-center gap-4 mb-4">
          <EntryPointForVerseCard />
          <EntryPointForBible />
        </div>
        <div className="grid grid grid-cols-1 md:grid-cols-2 justify-center gap-4 mb-4">
          <VerseFeed />
        </div>
      </div>
    </>
  )
}