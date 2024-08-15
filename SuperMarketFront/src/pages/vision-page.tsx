function TeamPage() {
  return (
    <section className="bg-background py-12 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 ">Our Team</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto ">
          We are a group of passionate developers and designers dedicated to
          creating a product that makes a real difference in people's lives. Our
          team is made up of experienced professionals who bring their unique
          skills and perspectives to the table, united by a common goal: to
          build the best supermarket shopping comparison app on the market.
        </p>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto text-transparent bg-clip-text bg-gradient-secondary mt-4">
          Meet our team:
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center max-w-xs text-background">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-4"
            src="/images/team-member-1.jpg"
            alt="Team Member 1"
          />
          <h3 className="text-xl font-semibold text-gray-900">Eden Rot</h3>
          <p className="text-gray-600">Lead Developer</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center max-w-xs text-background">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-4"
            src="/images/team-member-2.jpg"
            alt="Team Member 2"
          />
          <h3 className="text-xl font-semibold text-gray-900">Nati Cohen</h3>
          <p className="text-gray-600">UI/UX Designer</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center max-w-xs text-background">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-4"
            src="/images/team-member-3.jpg"
            alt="Team Member 3"
          />
          <h3 className="text-xl font-semibold text-gray-900">Omer Sidi</h3>
          <p className="text-gray-600">Product Manager</p>
        </div>
      </div>
    </section>
  );
}

export default TeamPage;
