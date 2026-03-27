import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="bg-accent text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
        <p className="text-xl mb-8">Sign up now and start organizing your tasks.</p>
        <Button variant="secondary">Sign Up</Button>
      </div>
    </section>
  );
}
