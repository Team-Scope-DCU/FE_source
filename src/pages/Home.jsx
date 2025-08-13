import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <main className="home">
      <section className="hero container">
        <h1 className="title">더 나은 생활을 위한 변화</h1>
        <SearchBar />
      </section>
      <CategoryGrid />
    </main>
  );
}
