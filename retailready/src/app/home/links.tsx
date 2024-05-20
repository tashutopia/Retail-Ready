import {
  ArchiveBoxArrowDownIcon,
  CheckIcon,
  ArrowDownOnSquareStackIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const links = [
  {
    name: "Assemble Orders",
    href: "/assemble",
    icon: ArchiveBoxArrowDownIcon,
  },
  {
    name: "Completed Orders",
    href: "/completed",
    icon: CheckIcon,
  },
  {
    name: "Manage Steps",
    href: "/steps",
    icon: ClipboardDocumentListIcon,
  },
];

export default links;
