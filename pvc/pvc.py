import graph
import matplotlib.pyplot as plt
from config import ADJLIST_GRAPH, EDGE_PATH_COLOR
import time
import math
from itertools import permutations

# traveling salesman function (exact approach)
def tsp_path_exact(G: graph.Graph) -> list:
    def tsp(g, s):
        path = []
        n = len(g)
        vertex = []
        for i in range(n):
            if i != start:
                vertex.append(i)

        min_path = math.inf
        next_permutation = permutations(vertex)
        for i in next_permutation:
            current_pathweight = 0
            current_path = []
            k = start
            for j in i:
                current_pathweight += g[k][j]
                current_path.append((k, j))
                k = j
            current_pathweight += g[k][s]
            current_path.append((k, s))

            if current_pathweight < min_path:
                mipathn_path = current_pathweight
                path = current_path.copy()

        return 

    g = G.tomatrix()
    start = 0
    path_idxs = tsp(g, start)
    cost = 0
    path = []
    for edge in path_idxs:
        i, j = edge
        path.append( (str(i+1), str(j+1)) )
        cost += g[i][j]
    return {'edges': path, 'cost': cost}

# checks if by adding an edge between u and v is gonna create a cycle in the graph g
def forms_cycle(g, u, v, last_visited=None) -> bool:
    if u == v :
        return True
    if u == None or len(g[u].adj) == 0 :
        return False
    next_neighbor = None
    for x,c in g[u].adj:
        if x != last_visited:
            next_neighbor = x
    return forms_cycle(g, next_neighbor, v, u)

# solve traveling salesman problem given a connexe graph (heuristic approach)
def tsp_path_heuristics(G: graph.Graph) -> list:
    g = graph.Graph(dict.fromkeys(G.vertices.keys(), set()))
    n = G.vertices_number()
    sorted_edges = sorted(G.unrepeated_edges(), key = lambda edge: edge[2])
    c = 0 
    i = 0 
    while c < n :
        u,v,cost = sorted_edges[i]
        if len(g[u].adj)<2 and len(g[v].adj)<2 and ((forms_cycle(g,u,v)==False and c<n-1) or (forms_cycle(g,u,v)==True and c==n-1)) :
            g.add_edge(u,v,cost)
            c+=1
        i+=1

    edges = g.unrepeated_edges()
    cost = sum([ c for u, v, c in edges ])
    path = [ (u, v) for u, v, w in edges ]
    return {'edges': path, 'cost': cost}

def tsp_path(G, tsp_func, alg_name):
    t = time.time()
    path = tsp_func(G)
    # print("path", path)
    dt = time.time() - t
    edge_color_key = {}
    for edge in path['edges']:
        u, v = edge
        edge_color_key[(u, v)] = EDGE_PATH_COLOR
        edge_color_key[(v, u)] = EDGE_PATH_COLOR
    title = f"\n {alg_name}\n tempsd'éxecution : {dt} secondes\n coût minimal : {path['cost']}"
    G.draw(edge_color_key=edge_color_key, title=title)

if __name__ == "__main__":
    plt.figure(figsize=(16, 16), dpi=100)

    G = graph.Graph(ADJLIST_GRAPH)

    tsp_path(G, tsp_path_exact, "Algorithme pour solution complète")
    tsp_path(G, tsp_path_heuristics, "Algorithme pour solution approximative (heuristiques)")

    plt.show()
