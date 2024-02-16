<?

use App\Entity\Service;
use App\Repository\ServiceRepository;

class SimilarServiceSuggester
{
    private ServiceRepository $serviceRepository;

    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    public function suggestSimilarServices(Service $service, int $limit = 5): array
    {
        $similarServices = [];

        // Récupérer tous les services de la même boutique sauf celui actuel
        $services = $this->serviceRepository->findBy(['shop' => $service->getShop(), 'id' => $service->getId()], ['id' => 'ASC']);

        // Comparer les services pour trouver ceux qui sont similaires
        foreach ($services as $otherService) {
            // Vérifier que ce n'est pas le même service
            if ($otherService->getId() !== $service->getId()) {
                // Comparer le nom et la description pour trouver des similitudes
                similar_text($service->getName(), $otherService->getName(), $similarityName);
                similar_text($service->getDescription(), $otherService->getDescription(), $similarityDescription);

                // Un service est similaire s'il a unr similarité de 50% ou plus pour le nom ou la description
                if ($similarityName >= 50 || $similarityDescription >= 50) {
                    $similarServices[] = $otherService;
                }

                // if (count($similarServices) >= $limit) break;
            }
        }

        return $similarServices;
    }
}
