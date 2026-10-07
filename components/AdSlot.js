// Ad slot: abhi placeholder hai. Baad mein yahan AdSense/native ad ka code lagayein.
// Height pehle se reserve hoti hai, is liye ad load hone par layout nahi hilta.
export default function AdSlot({ id = "banner", enabled = true }) {
  if (!enabled) return <div className="ad hidden" />;
  return (
    <div className="ad" data-slot={id} aria-label="Advertisement">
      Ad slot: {id}
    </div>
  );
}
