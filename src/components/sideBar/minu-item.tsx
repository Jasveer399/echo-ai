import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type MenuItemProps = {
    size: 'max' | 'min';
    label: string;
    icon: React.ComponentType;
    path?: string;
    current?: string;
    onSignOut?(): void;
  };

  const MenuItem: React.FC<MenuItemProps> = ({ size, path, icon: Icon, label, current, onSignOut }) => {
    switch (size) {
      case 'max':
        return (
          <Link
            onClick={onSignOut}
            className={cn(
              'flex items-center gap-2 px-1 py-2 rounded-lg my-1',
              !current
                ? 'text-gray-500'
                : current == path
                ? 'bg-white border border-orange font-bold text-black'
                : 'text-gray-500'
            )}
            href={path ? `/${path}` : '#'}
          >
            <Icon /> {label}
          </Link>
        );
      case 'min':
        return (
          <Link
            onClick={onSignOut}
            className={cn(
              !current
                ? 'text-gray-500'
                : current == path
                ? 'bg-white rounded-full border border-orange px-2 font-bold text-black'
                : 'text-gray-500',
              'rounded-lg py-2 my-1'
            )}
            href={path ? `/${path}` : '#'}
          >
            <Icon />
          </Link>
        );
      default:
        return null;
    }
  };

export default MenuItem;
