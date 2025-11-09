"use client";

import Link from "next/link";
import { FC } from "react";

interface TitleLinkProps {
  title: string;
  id: number;
}

export const TitleLink: FC<TitleLinkProps> = ({ title, id }) => {
  return (
    <Link href={`/events/${id}`} className="group">
        <h2 className="text-lg font-semibold leading-7 text-foreground/90 group-hover:text-primary transition-colors">
            {title}
        </h2>
    </Link>
  );
};