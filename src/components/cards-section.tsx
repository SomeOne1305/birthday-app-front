import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const BirthdayCard = ({
  name,
  birthDate,
  relation,
  notes,
}: {
  name: string;
  birthDate: string;
  relation: string;
  notes?: string;
}) => (
  <Card className=" hover:scale-[1.01] transition-transform duration-300 border border-[#DBE2EF]">
    <CardContent className="flex flex-col justify-between">
      <h3 className="text-2xl font-veronica-scripts text-[#3F72AF]">{name}</h3>
      <p className="text-sm text-[#112D4E] mb-2">
        {new Date(birthDate).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <span className="inline-block text-xs bg-[#DBE2EF] text-[#112D4E] px-2 py-1 rounded-full mb-2 font-semibold">
        {relation}
      </span>
      {notes && (
        <p className="text-sm text-gray-600 italic truncate max-w-xs">
          "{notes}"
        </p>
      )}
    </CardContent>
    <CardFooter>
      <Button className="bg-[#3F72AF] text-white hover:bg-[#112D4E] w-full">
        Send Wishes 🎈
      </Button>
    </CardFooter>
  </Card>
);


const CardsSection = () => (
  <section className="w-full bg-[#F9F7F7] py-16 px-6">
    <h2 className="text-4xl font-veronica-scripts text-[#3F72AF] text-center mb-6">
      Some Birthday Highlights
    </h2>
    <p className="text-center text-[#112D4E] max-w-xl mx-auto mb-12">
      Here’s how your birthday list might look once you’re all set:
    </p>
    <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <BirthdayCard
        name="Anna Petrova"
        birthDate="1990-07-22"
        relation="Family"
        notes="Loves sunflowers 🌻"
      />
      <BirthdayCard
        name="Uncle Karim"
        birthDate="1975-08-01"
        relation="Family"
        notes="Chess legend ♟️"
      />
      <BirthdayCard
        name="Sara"
        birthDate="2010-08-05"
        relation="Friend"
        notes="Don’t forget her cake!"
      />
      <BirthdayCard name="Mama" birthDate="1965-12-30" relation="Family" />
      <BirthdayCard
        name="John Doe"
        birthDate="1988-11-15"
        relation="Colleague"
        notes="Always busy, send early!"
      />
    </div>
  </section>
);

export default CardsSection