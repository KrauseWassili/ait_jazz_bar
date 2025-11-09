import { TitleLink } from "./TitleLink";
import JazzBarEvent from "@/app/types/Jazz-bar-event";

interface Props {
  event: JazzBarEvent;
  variant?: "default" | "with-back-btn";
}

export const EventCard = ({ event }: Props) => {
  const {
    id,
    title,
    image,
    description,
    place,
    datetime,
    price,
    email,
    phone,
    createdAt,
  } = event;

  return (
    <div>
      <TitleLink title={title} id={id} />

      <img src={image ?? ""} alt={title} width="200px" />

      <p>{place}</p>
      <p>{description}</p>
      <p>{datetime?.toLocaleString()}</p>
    </div>
  );
};
