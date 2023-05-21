import { EmptyState, ClientOnly } from "@/app/components";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <ClientOnly>
      <EmptyState
        title="You must be signed in to view your favorites."
        subtitle="Sign in or create an account to get started."
      />
    </ClientOnly>;
  }

  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    <ClientOnly>
      <EmptyState
        title="You don't have any favorites yet."
        subtitle="Find your perfect place and save it to your favorites."
      />
    </ClientOnly>;
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
