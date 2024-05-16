import { fetchScreens } from "@/scripts/fetch/fetchScreens";
import Link from "next/link";
import { auth } from "@/app/login/auth";

export async function Steps({
  orderNumber,
  sku,
}: {
  orderNumber: string;
  sku: string;
}) {
  const user = await auth();
  const screens = await fetchScreens(sku, orderNumber, user?.user?.email || "");
  let steps: Array<any> | null = null;
  let sequence = null;
  if (screens && screens.length === 2) {
    steps = screens[0];
    sequence = screens[1];
  }

  let stepsArray: Array<Array<string>> = [];
  if (steps && typeof steps[0] === "object" && sequence) {
    sequence.forEach((num) => {
      if (steps && steps[0][num.toString()]) {
        stepsArray.push(steps[0][num.toString()]);
      }
    });
    console.log("Steps");
    console.log(steps[0]);
    console.log("Sequence");
    console.log(sequence);
    console.log("Steps Array");
    console.log(stepsArray);
  }

  return <main>testing</main>;
}

export default Steps;
