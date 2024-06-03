import Hero from "../assets/hero-img.webp";
import Button from "@mui/material/Button";
import { useGetCoffes } from "../services/api/useGetCoffe";
import { ListCoffes } from "../services/api/models/types";
import Card from "../components/card-coffe";
import { CardContent, Grid, Skeleton } from "@mui/material";

function Home() {
  const { data, isFetching, error } = useGetCoffes();

  return (
    <>
      <div className="  relative px-4 justify-between items-center h-100 min-h-screen bg-center bg-no-repeat bg-hero object-cover sm:flex  md:bg-none">
        <div className="absolute md:static bottom-10">
          <h1 className=" text-white text-3xl font-bold pt-40 md:text-text md:text-4xl  ">
            Prove apenas do melhor café de todos!
          </h1>
          <p className=" mt-2 text-white md:text-text ">
            O melhor café da cidade e com um sabor poderoso
          </p>

          <Button variant="contained" className=" bg-primary px-12 mt-9">
            Provar
          </Button>
        </div>

        <div className="hidden md:block">
          <img src={Hero} alt="Imagem de três chicaras de café" />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-center my-10">
        Nossos melhores cafés
      </h2>

      <div className="flex flex-wrap gap-5 justify-center">
        {isFetching && (
          <Grid container spacing={2}>
            {Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={140} />
                <CardContent>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Grid>
            ))}
          </Grid>
        )}

        {data &&
          data.map((coffes: ListCoffes) => (
            <div key={coffes.id}>
              <Card
                title={coffes.name}
                price={coffes.price}
                description={coffes.description}
                picture={coffes.image_url}
                id={coffes.id}
              />
            </div>
          ))}

        {error && <h2>Erro ao carregar os dados</h2>}
      </div>
    </>
  );
}

export default Home;
