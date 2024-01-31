 # Programming Theory Course 
## TP 1: Knapsack Problem
Let be a set of $n$ objects $N={1,2,...,n}$ and a knapsack that can hold a maximum weight of $W$. 
Each object $i$ has a weight $w_i$ and a gain $v_i$ . The problem is to choose a set of objects from the $n$ objects, at most one of each, to put in the knapsack, in such a way as to maximize the total gain (of the objects in the bag), without exceeding the bag's capacity.
### [Solution](./knapsack/)

## TP 2: Graph Articulation Points Algorithm
Write a program to calculate the articulation points of a graph. An articulation point of a graph is a vertex such that if you remove it, you increase the number of related components. To do this, use DFS or BFS.
### [Solution](./graph-articulation-points/) 

## TP 3: Travelling Salesman Problem
Given a complete undirected graph labeled with strictly positive weights, determine the minimum-weight Hamiltonian cycle (Shortest path). Use the following graph to test your solution.
![](./pvc/PVC.png)
### [Solution](./pvc/)

## TP 4: Chess Estimation Function
The program in [`jeu.c`](./chess-minimax/jeu.c) is a machine playing chess with a user using MINIMAX algorithm. This program uses an estimation function that is not optimized. The goal of this work is to create a more refined and precise estimation function. 
### [Solution](./chess-minimax/)
