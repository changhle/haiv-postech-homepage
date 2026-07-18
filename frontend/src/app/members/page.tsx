import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getMembers } from "@/lib/api";
import type { Member } from "@/lib/data/members";

export const metadata: Metadata = {
  title: "Members",
  description: "The people of HAIV Lab — faculty, researchers, students, and alumni.",
};

/** Gradient initials stand in for profile photos until real ones are added. */
function Avatar({ member }: { member: Member }) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <div
      aria-hidden
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-neon/25 font-display text-xl font-semibold text-white/85"
      style={{
        background: `linear-gradient(135deg, ${member.avatar[0]}, ${member.avatar[1]})`,
      }}
    >
      {initials}
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="card card-hover flex items-start gap-5 p-5">
      <Avatar member={member} />
      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold">{member.name}</h3>
        <p className="font-mono text-[0.68rem] uppercase tracking-widest text-orchid/80">
          {member.role}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-mist/75">
          {member.interests}
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          <a
            href={`mailto:${member.email}`}
            className="font-mono text-xs tracking-wider text-orchid hover:text-royal"
          >
            Email
          </a>
          {member.homepage && (
            <a
              href={member.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-orchid hover:text-royal"
            >
              Homepage ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function MembersPage() {
  const { groups: memberGroups, alumni } = await getMembers();
  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-8">
      <Reveal>
        <SectionHeading
          eyebrow="Members"
          title="The people behind the work"
        />
      </Reveal>

      {memberGroups.map((group, gi) => (
        <section key={group.label} className="py-6">
          <Reveal>
            <h2 className="eyebrow">{group.label}</h2>
          </Reveal>
          <div
            className={`mt-4 grid gap-5 ${
              group.members.length > 1 ? "md:grid-cols-2" : "md:max-w-xl"
            }`}
          >
            {group.members.map((m, i) => (
              <Reveal key={m.name} delay={(gi * 0.03 + i * 0.06) % 0.3}>
                <MemberCard member={m} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <hr className="hairline my-12" />

      {/* Alumni */}
      <section className="py-6">
        <Reveal>
          <SectionHeading
            eyebrow="Alumni"
            title="Where our graduates went"
          />
        </Reveal>
        <Reveal>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-neon/20 font-mono text-[0.68rem] uppercase tracking-widest text-mist/70">
                  <th className="px-5 py-3.5 font-medium">Name</th>
                  <th className="px-5 py-3.5 font-medium">Degree</th>
                  <th className="px-5 py-3.5 font-medium">Now</th>
                  <th className="px-5 py-3.5 font-medium">Email</th>
                </tr>
              </thead>
              <tbody>
                {alumni.map((a) => (
                  <tr
                    key={a.name}
                    className="border-b border-neon/10 last:border-b-0 hover:bg-neon/5"
                  >
                    <td className="px-5 py-3.5 font-medium text-ink">{a.name}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-orchid/85">
                      {a.degree}
                    </td>
                    <td className="px-5 py-3.5 text-mist/80">{a.now}</td>
                    <td className="px-5 py-3.5">
                      <a
                        href={`mailto:${a.email}`}
                        className="text-orchid hover:text-royal"
                      >
                        {a.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
