import SectionHeading from '../Home/SectionHeading'
import ContactForm from '~/components/organisms/ContactForm'

export default function Contact() {
    return (
        <section id="contacto">
            <SectionHeading
                badgeLabel="Contacto"
                title="¿Creamos algo que<span class='font-accent tracking-normal'> merezca la pena</span>?"
                description="Te respondemos en menos de 24 horas"
            />
            <ContactForm />
        </section>
    )
}
