import { EmptyState, ClientOnly } from "@/app/components";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservation({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't made any reserved any trips yet."
        />
      </ClientOnly>
    );
  }

  return (
    <div>
      <ClientOnly>
        <TripsClient reservations={reservations} currentUser={currentUser} />
      </ClientOnly>
    </div>
  );
};

export default TripsPage;
