import { redirect } from 'next/navigation';

export default function FilterDefault() {
  redirect('/notes/filter/All');
}
